import { Router, Request, Response } from 'express'
import { VERSION, prisma } from '../config'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.send(`🚀Welcome to the RUC🇵🇾 API v${VERSION}`);
});

router.get('/ruc/:ruc', async (req: Request, res: Response) => {
  const { ruc } = req.params
  const contribuyente = await prisma.contribuyente.findUnique({
    where: { ruc }
  })
  res.send(contribuyente)
});

// create a route for seeking by razonSocial
router.get('/razon-social/:razonSocial', async (req: Request, res: Response) => {
  const { razonSocial } = req.params
  const contribuyentes = await prisma.contribuyente.findMany({
    where: { razonSocial: { contains: razonSocial } }
  })
  res.send(contribuyentes)
});

// 404 fallback route
router.use((_req: Request, res: Response) => {
  res.status(404).send('🤷‍♂️ Nothing to see here...');
});

// Export the router
export default router;
