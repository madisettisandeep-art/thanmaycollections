-- ==============================================================================
-- THANMAY COLLECTIONS: ROW LEVEL SECURITY (RLS) POLICIES
-- Zero-trust access controls adhering to OWASP ASVS standards
-- ==============================================================================

-- Helper function to check if the caller is an active administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.role() = 'service_role' OR
        EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE user_id = auth.uid() AND is_active = true
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. CATEGORIES RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Anonymous and Authenticated users can read active categories
CREATE POLICY "Public can view active categories"
ON public.categories FOR SELECT
USING (is_active = true OR public.is_admin());

-- Only admins can insert, update, delete categories
CREATE POLICY "Admins can manage categories"
ON public.categories FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 2. PRODUCTS RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can read active products
CREATE POLICY "Public can view active products"
ON public.products FOR SELECT
USING (is_active = true OR public.is_admin());

-- Only admins can insert, update, or delete products
CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 3. PRODUCT IMAGES RLS
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Public can view images for visible products
CREATE POLICY "Public can view product images"
ON public.product_images FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.products p
        WHERE p.id = product_images.product_id
        AND (p.is_active = true OR public.is_admin())
    )
);

-- Only admins can manage product images
CREATE POLICY "Admins can manage product images"
ON public.product_images FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 4. ORDERS RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- No public reading of orders. Only admins or service_role can view orders.
CREATE POLICY "Admins can view orders"
ON public.orders FOR SELECT
USING (public.is_admin());

-- Orders can be inserted via validated server-side workflow (service_role) or controlled public insert
CREATE POLICY "Server and validated checkout can insert orders"
ON public.orders FOR INSERT
WITH CHECK (true);

-- Only admins can update or delete orders
CREATE POLICY "Admins can update orders"
ON public.orders FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 5. ORDER ITEMS RLS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view order items"
ON public.order_items FOR SELECT
USING (public.is_admin());

CREATE POLICY "Validated checkout can insert order items"
ON public.order_items FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage order items"
ON public.order_items FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 6. ADMIN PROFILES RLS
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Only admins can view or modify admin profiles
CREATE POLICY "Admins can view admin profiles"
ON public.admin_profiles FOR SELECT
USING (public.is_admin());

CREATE POLICY "Super admins can manage admin profiles"
ON public.admin_profiles FOR ALL
USING (
    auth.role() = 'service_role' OR
    EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE user_id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
);

-- 7. INVENTORY LOGS RLS
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view inventory logs"
ON public.inventory_logs FOR SELECT
USING (public.is_admin());

CREATE POLICY "Admins can insert inventory logs"
ON public.inventory_logs FOR INSERT
WITH CHECK (public.is_admin());

-- 8. AUDIT LOGS RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
ON public.audit_logs FOR SELECT
USING (public.is_admin());

CREATE POLICY "Admins and system can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (public.is_admin() OR auth.role() = 'service_role');

-- 9. CONTACT ENQUIRIES RLS
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit contact enquiries"
ON public.contact_enquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view and manage enquiries"
ON public.contact_enquiries FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
