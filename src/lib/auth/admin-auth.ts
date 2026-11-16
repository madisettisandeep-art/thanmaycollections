import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface StoredCredentials {
  email: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

const CREDENTIALS_FILE = path.join(process.cwd(), 'config', 'admin-auth.json');
const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || 'admin@thanmaycollections.com';
const DEFAULT_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || 'ThanmayLuxury2026!';

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function loadCredentials(): StoredCredentials {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const data = fs.readFileSync(CREDENTIALS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading admin credentials, using defaults:', err);
  }

  // Create default credentials if none exist
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(DEFAULT_PASSWORD, salt);
  const defaultCreds: StoredCredentials = {
    email: DEFAULT_EMAIL,
    passwordHash,
    salt,
    updatedAt: new Date().toISOString(),
  };

  try {
    const dir = path.dirname(CREDENTIALS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(defaultCreds, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing default credentials file:', err);
  }

  return defaultCreds;
}

export function verifyAdmin(email: string, passwordAttempt: string): boolean {
  const creds = loadCredentials();
  if (email.toLowerCase().trim() !== creds.email.toLowerCase().trim()) {
    return false;
  }
  const attemptHash = hashPassword(passwordAttempt, creds.salt);
  return attemptHash === creds.passwordHash;
}

export function updateAdminPassword(currentPasswordAttempt: string, newPassword: string): { success: boolean; message: string } {
  const creds = loadCredentials();

  // Verify current password first
  const currentHash = hashPassword(currentPasswordAttempt, creds.salt);
  if (currentHash !== creds.passwordHash) {
    return { success: false, message: 'Current password is incorrect' };
  }

  if (!newPassword || newPassword.length < 8) {
    return { success: false, message: 'New password must be at least 8 characters long' };
  }

  // Generate new salt and hash for the new password
  const newSalt = crypto.randomBytes(16).toString('hex');
  const newHash = hashPassword(newPassword, newSalt);

  const updatedCreds: StoredCredentials = {
    email: creds.email,
    passwordHash: newHash,
    salt: newSalt,
    updatedAt: new Date().toISOString(),
  };

  try {
    const dir = path.dirname(CREDENTIALS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(updatedCreds, null, 2), 'utf8');
    return { success: true, message: 'Password updated successfully. You can now use your new password.' };
  } catch (err) {
    console.error('Error writing updated credentials:', err);
    return { success: false, message: 'Failed to persist new password' };
  }
}

export function getAdminEmail(): string {
  const creds = loadCredentials();
  return creds.email;
}
