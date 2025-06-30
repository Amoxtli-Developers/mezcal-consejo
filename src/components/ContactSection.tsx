'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, User } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const onSubmit = async (data: ContactFormData) => {
    setIsSending(true);
    setResponseMessage('');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Error al enviar el formulario');

      const result = await res.json();
      setResponseMessage(t('contact.success') || '¡Mensaje enviado correctamente!');
      reset();
    } catch (err) {
      console.error(err);
      setResponseMessage(t('contact.error') || 'Hubo un error al enviar tu mensaje. Inténtalo más tarde.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-medium text-navy-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-10 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <span className="bg-navy-900 p-2">
                <User className="w-6 h-6 text-white" />
              </span>
              <div className="w-full">
                <Input
                  {...register('name', { required: 'Este campo es requerido' })}
                  placeholder={t('contact.form.name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-navy-900 p-2">
                <Mail className="w-6 h-6 text-white" />
              </span>
              <div className="w-full">
                <Input
                  type="email"
                  {...register('email', {
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido',
                    },
                  })}
                  placeholder={t('contact.form.email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Textarea
              {...register('message', { required: 'Este campo es requerido' })}
              rows={6}
              placeholder={t('contact.form.message')}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSending}
              className="bg-navy-900 hover:bg-navy-800 px-6 py-3 text-base font-medium"
            >
              {isSending ? t('contact.form.sending') || 'Enviando...' : t('contact.form.send')}
            </Button>
            {responseMessage && (
              <p className="text-sm mt-4 text-gray-700">{responseMessage}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
