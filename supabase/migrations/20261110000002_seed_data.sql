-- ==============================================================================
-- THANMAY COLLECTIONS: SEED DATA
-- Luxury Imitation Jewellery Catalogue Seed Data
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, image_url, display_order, is_active) VALUES
('11111111-1111-1111-1111-111111111001', 'Necklace Sets', 'necklace-sets', 'Grand choker sets, bridal rani haars, and delicate pendant necklaces with matching earrings.', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80', 1, true),
('11111111-1111-1111-1111-111111111002', 'Earrings', 'earrings', 'Exquisite jhumkas, chandbalis, studs, and chandelier drops crafted for grace.', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80', 2, true),
('11111111-1111-1111-1111-111111111003', 'Bangles', 'bangles', 'Regal kada bangles, bridal chuda sets, and sleek antique gold-finish bangles.', 'https://images.unsplash.com/photo-1611591475870-87779d714e8d?auto=format&fit=crop&w=800&q=80', 3, true),
('11111111-1111-1111-1111-111111111004', 'Bridal Jewellery', 'bridal-jewellery', 'Complete bridal sets featuring regal choker necklaces, maang tikka, and nath.', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 4, true),
('11111111-1111-1111-1111-111111111005', 'Temple Jewellery', 'temple-jewellery', 'Intricately carved deity motifs with antique gold matte polish and ruby-emerald accents.', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80', 5, true),
('11111111-1111-1111-1111-111111111006', 'Kundan Jewellery', 'kundan-jewellery', 'Timeless royal uncut polki & kundan setting with fine meenakari handiwork.', 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80', 6, true),
('11111111-1111-1111-1111-111111111007', 'Daily Wear Jewellery', 'daily-wear-jewellery', 'Lightweight, anti-tarnish, minimal jewellery curated for everyday elegance.', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80', 7, true),
('11111111-1111-1111-1111-111111111008', 'Traditional Jewellery', 'traditional-jewellery', 'Heritage-inspired heirloom pieces celebrating rich Indian tradition.', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80', 8, true)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (id, product_code, slug, name, description, price, discount_price, category_id, stock_quantity, material, occasion, is_featured, is_new_arrival, is_bestseller, is_active) VALUES
('22222222-2222-2222-2222-222222222001', 'TC-NK-001', 'padmavati-royal-kundan-choker-set', 'Padmavati Royal Kundan Choker Set', 'A masterfully crafted royal choker necklace set adorned with fine uncut polki kundan, radiant champagne pearls, and delicate emerald green drop beads. Comes with matching statement drop earrings and maang tikka.', 4899.00, 3999.00, '11111111-1111-1111-1111-111111111001', 12, 'Brass base, 24K Gold Micron Plating, Hydro Beads', 'Weddings & Receptions', true, true, true, true),

('22222222-2222-2222-2222-222222222002', 'TC-NK-002', 'divine-lakshmi-antique-temple-haar', 'Divine Lakshmi Antique Temple Long Haar', 'Exquisite South Indian heritage temple long necklace showcasing Goddess Lakshmi amidst blooming lotus carvings. Embellished with ruby cabochons and matte antique gold finish.', 5499.00, 4499.00, '11111111-1111-1111-1111-111111111005', 8, 'Premium Copper-Brass Alloy, Antique Matte Gold Dip', 'Festivals & Traditional Ceremonies', true, false, true, true),

('22222222-2222-2222-2222-222222222003', 'TC-ER-001', 'maharani-peacock-meenakari-jhumkas', 'Maharani Peacock Meenakari Jhumkas', 'Regal handcrafted jhumkas featuring majestic dancing peacock artwork in baby pink and turquoise meenakari enamelling, tiered jhumki domes and clustered seed pearls.', 2199.00, 1699.00, '11111111-1111-1111-1111-111111111002', 20, 'Silver-Copper Alloy, Hand-painted Meenakari', 'Sangeet & Festive Parties', true, true, false, true),

('22222222-2222-2222-2222-222222222004', 'TC-ER-002', 'kundan-chandbali-earrings-with-pearls', 'Imperial Kundan Chandbali Earrings', 'Timeless crescent moon chandbali earrings layered with premium grade faceted glass kundan stones and cultured freshwater-look pearl fringes.', 1899.00, 1499.00, '11111111-1111-1111-1111-111111111002', 15, 'Brass, Micro Gold Polish, Cultured Beads', 'Cocktail & Haldi Functions', false, false, true, true),

('22222222-2222-2222-2222-222222222005', 'TC-BG-001', 'royal-jadau-openable-kada-pair', 'Royal Jadau Openable Kada Bangle Pair', 'Intricate openable bangle pair featuring floral jadau setting, synthetic rubies, and detailed filigree side-guards. Fitted with safe screw locks.', 3299.00, 2799.00, '11111111-1111-1111-1111-111111111003', 10, 'High-grade Brass, Gold Polish, Screw Clasp', 'Weddings & Family Celebrations', true, false, true, true),

('22222222-2222-2222-2222-222222222006', 'TC-BR-001', 'aadya-grand-bridal-trousseau-set', 'Aadya Grand Bridal Trousseau 7-Piece Set', 'The ultimate bridal statement. Includes grand choker necklace, matching layered rani haar, oversized chandelier earrings, maang tikka, bridal nath, and pair of hathphool.', 12999.00, 9999.00, '11111111-1111-1111-1111-111111111004', 5, 'Heavy Brass Metal, Real Polki Look, Austrian Zirconia', 'Bridal Wedding Day', true, true, true, true),

('22222222-2222-2222-2222-222222222007', 'TC-TM-001', 'nakshi-carved-peacock-kasu-necklace', 'Nakshi Carved Peacock Kasu Mala', 'Traditional South Indian coin kasu necklace with handcrafted nakshi artwork depicting auspicious motifs, accented with synthetic emeralds.', 4299.00, 3699.00, '11111111-1111-1111-1111-111111111005', 9, 'Temple Antique Gold Polish, Copper Alloy', 'Temple Visits & Pujas', false, true, false, true),

('22222222-2222-2222-2222-222222222008', 'TC-KD-001', 'noor-pastel-pink-kundan-necklace', 'Noor Pastel Pink Kundan Choker', 'Subtle, romantic pastel pink kundan necklace tailored to contemporary brides. Finished with baby pink fluorite drops and champagne crystal accents.', 3799.00, 3199.00, '11111111-1111-1111-1111-111111111006', 14, 'Gold-plated Brass, Pastel Enamel & Kundan', 'Engagement & Reception', true, true, false, true),

('22222222-2222-2222-2222-222222222009', 'TC-DW-001', 'celestial-solitaire-cz-minimal-pendant', 'Celestial Solitaire CZ Minimal Pendant Set', 'Delicate anti-tarnish everyday necklace featuring a brilliant-cut AAA Austrian cubic zirconia solitaire pendant suspended on an 18K gold-plated sleek chain.', 1299.00, 999.00, '11111111-1111-1111-1111-111111111007', 35, 'Stainless Steel, 18K PVD Gold Plated (Anti-tarnish)', 'Daily Office & Casual Elegance', false, false, true, true),

('22222222-2222-2222-2222-222222222010', 'TC-DW-002', 'clover-motif-delicate-chain-bracelet', 'Four-Leaf Clover Delicate Chain Bracelet', 'Feminine mother-of-pearl finish four-leaf clover motifs connected with a shimmering cable chain and lobster clasp.', 999.00, 799.00, '11111111-1111-1111-1111-111111111007', 25, '316L Surgical Grade Steel, Waterproof Gold Dip', 'Everyday Styling', false, true, true, true)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Product Images
INSERT INTO public.product_images (id, product_id, image_path, alt_text, display_order) VALUES
('33333333-3333-3333-3333-333333333001', '22222222-2222-2222-2222-222222222001', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85', 'Padmavati Royal Kundan Choker Set main view', 1),
('33333333-3333-3333-3333-333333333002', '22222222-2222-2222-2222-222222222001', 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=85', 'Padmavati Royal Kundan Choker detail shot', 2),
('33333333-3333-3333-3333-333333333003', '22222222-2222-2222-2222-222222222002', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=85', 'Divine Lakshmi Antique Temple Long Haar front view', 1),
('33333333-3333-3333-3333-333333333004', '22222222-2222-2222-2222-222222222003', 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=85', 'Maharani Peacock Meenakari Jhumkas pair', 1),
('33333333-3333-3333-3333-333333333005', '22222222-2222-2222-2222-222222222004', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85', 'Imperial Kundan Chandbali Earrings close up', 1),
('33333333-3333-3333-3333-333333333006', '22222222-2222-2222-2222-222222222005', 'https://images.unsplash.com/photo-1611591475870-87779d714e8d?auto=format&fit=crop&w=1000&q=85', 'Royal Jadau Openable Kada Bangle Pair', 1),
('33333333-3333-3333-3333-333333333007', '22222222-2222-2222-2222-222222222006', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85', 'Aadya Grand Bridal Trousseau 7-Piece Set full layout', 1),
('33333333-3333-3333-3333-333333333008', '22222222-2222-2222-2222-222222222007', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85', 'Nakshi Carved Peacock Kasu Mala', 1),
('33333333-3333-3333-3333-333333333009', '22222222-2222-2222-2222-222222222008', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85', 'Noor Pastel Pink Kundan Choker', 1),
('33333333-3333-3333-3333-333333333010', '22222222-2222-2222-2222-222222222009', 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85', 'Celestial Solitaire CZ Minimal Pendant', 1),
('33333333-3333-3333-3333-333333333011', '22222222-2222-2222-2222-222222222010', 'https://images.unsplash.com/photo-1611591475870-87779d714e8d?auto=format&fit=crop&w=1000&q=85', 'Four-Leaf Clover Delicate Chain Bracelet', 1)
ON CONFLICT (id) DO NOTHING;
