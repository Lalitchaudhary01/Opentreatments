const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    const userCols = await prisma.$queryRawUnsafe(`
      SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_schema='public' AND table_name='User'
      ORDER BY ordinal_position
    `);
    const accountCols = await prisma.$queryRawUnsafe(`
      SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_schema='public' AND table_name='Account'
      ORDER BY ordinal_position
    `);
    console.log('User columns:', userCols);
    console.log('Account columns:', accountCols);
  } catch (e) {
    console.error('DB check error:', e);
  } finally {
    await prisma.$disconnect();
  }
})();
