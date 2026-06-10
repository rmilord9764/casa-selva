import { SquareClient, SquareEnvironment } from 'square';
import { randomUUID } from 'crypto';
import { config } from '../config.js';
const client = new SquareClient({ token: config.square.accessToken,
  environment: config.square.environment === 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox });
export async function chargeCard({ sourceId, amountCents, currency = 'USD', referenceId, note }) {
  const res = await client.payments.create({ sourceId, idempotencyKey: randomUUID(),
    amountMoney: { amount: BigInt(amountCents), currency }, locationId: config.square.locationId, referenceId, note });
  return res.payment;
}
export async function createSquareBooking({ startAt, serviceVariationId, customer }) {
  const res = await client.bookings.create({ booking: { startAt, locationId: config.square.locationId,
    appointmentSegments: [{ serviceVariationId, teamMemberId: 'TMxxxx', durationMinutes: 120 }], customerNote: customer?.note } });
  return res.booking;
}
export async function refundPayment(paymentId, amountCents) {
  return client.refunds.refundPayment({ idempotencyKey: randomUUID(), paymentId,
    amountMoney: { amount: BigInt(amountCents), currency: 'USD' } });
}
