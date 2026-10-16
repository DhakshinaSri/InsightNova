import React, {useState} from 'react';
import {submitEnquiry} from '../services/enquiries.js';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const enquiry = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
    if (Object.values(enquiry).some(value => !value)) {
      setStatus('Please complete all fields.');
      return;
    }
    const digits = enquiry.contactNumber.replace(/\D/g, '');
    if (!/^[+\d\s().-]+$/.test(enquiry.contactNumber) || digits.length < 7 || digits.length > 15) {
      setStatus('Please enter a valid contact number with 7 to 15 digits.');
      form.elements.contactNumber.focus();
      return;
    }
    setPending(true);
    setStatus('');
    try {
      await submitEnquiry(enquiry);
      form.reset();
      setStatus('Your enquiry has been sent.');
    } catch {
      setStatus('Your enquiry could not be sent. Please try again later.');
    } finally {
      setPending(false);
    }
  }

  return <form className="contact-form" onSubmit={handleSubmit} aria-label="Enquiry Form" aria-busy={pending}>
    <fieldset disabled={pending}>
      <legend className="sr-only">Contact details and message</legend>
      <div className="form-field">
        <label htmlFor="full-name">Full name</label>
        <input id="full-name" name="fullName" type="text" autoComplete="name" maxLength={120} required />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required />
      </div>
      <div className="form-field">
        <label htmlFor="contact-number">Contact number</label>
        <input id="contact-number" name="contactNumber" type="tel" autoComplete="tel" maxLength={30} required />
      </div>
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} maxLength={5000} required />
      </div>
      <button className="button" type="submit">{pending ? 'Sending…' : 'Send Us an Enquiry'}<span aria-hidden="true">↗</span></button>
    </fieldset>
    <p className="form-status" role="status" aria-live="polite" aria-atomic="true">{status}</p>
  </form>;
}
