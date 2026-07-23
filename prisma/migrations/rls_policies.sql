-- BeGoodDisciple (BGD) - Row Level Security (RLS) SQL Policies

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RelationDiscipolat" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ObjectifAnnuel" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ObjectifCategorie" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SuiviQuotidien" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EntreeSuivi" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CompteRendu" ENABLE ROW LEVEL SECURITY;

-- 1. USER TABLE POLICIES
CREATE POLICY "Users can view and update their own profile"
  ON "User" FOR ALL
  USING (auth.uid()::text = id);

-- 2. OBJECTIF ANNUEL & CATEGORIE POLICIES
CREATE POLICY "Disciples can manage their own annual objectives"
  ON "ObjectifAnnuel" FOR ALL
  USING (auth.uid()::text = "userId");

CREATE POLICY "Disciples can manage their objective categories"
  ON "ObjectifCategorie" FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "ObjectifAnnuel"
      WHERE "ObjectifAnnuel".id = "ObjectifCategorie"."objectifAnnuelId"
      AND "ObjectifAnnuel"."userId" = auth.uid()::text
    )
  );

-- 3. SUIVI QUOTIDIEN & ENTREE POLICIES
CREATE POLICY "Disciples can manage their own daily tracking logs"
  ON "SuiviQuotidien" FOR ALL
  USING (auth.uid()::text = "userId");

CREATE POLICY "Disciples can manage their daily entries"
  ON "EntreeSuivi" FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM "SuiviQuotidien"
      WHERE "SuiviQuotidien".id = "EntreeSuivi"."suiviQuotidienId"
      AND "SuiviQuotidien"."userId" = auth.uid()::text
    )
  );

-- 4. COMPTE RENDU POLICIES (Disciple full access, Mentor read-only for transmitted reports)
CREATE POLICY "Disciples can manage their own reports"
  ON "CompteRendu" FOR ALL
  USING (auth.uid()::text = "discipleId");

CREATE POLICY "Mentors can read reports sent to them"
  ON "CompteRendu" FOR SELECT
  USING (
    "statutEnvoi" IN ('ENVOYE', 'REVU')
    AND (
      "mentorId" = auth.uid()::text
      OR "mentorEmail" = auth.jwt() ->> 'email'
    )
  );
