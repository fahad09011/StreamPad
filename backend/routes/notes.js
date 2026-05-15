import express from 'express';
const router = express.Router();

router.get('/', (request, response) => {
  const notes = {
    title: 'Bootcamp May 21, 2026',
    description: 'Joining online bootcamp happenning this may 2026 on AI agentic development',
    tag: 'participation'
  }
  response.json(notes)
})
export default router