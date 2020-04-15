import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const routes = Router();
const appointmentRepository = new AppointmentRepository();
const service = new CreateAppointmentService(appointmentRepository);

routes.get('/', (req, res) => {
  const appointments = appointmentRepository.findAll();
  return res.status(200).json(appointments);
});

routes.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);
    const appointment = service.execute({ date: parsedDate, provider });
    return res.status(201).json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default routes;
