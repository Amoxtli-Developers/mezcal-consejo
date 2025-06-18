'use client';

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data);
    alert('Mensaje enviado correctamente!');
    reset();
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-medium text-navy-900 mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <span className="bg-navy-900 p-2">
                <User className="w-6 h-6 text-white" />
              </span>
              <Input
                {...register('name', { required: 'Este campo es requerido' })}
                className="w-full px-4 py-3 border-gray-300"
                placeholder={t('contact.form.name')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <span className="bg-navy-900 p-2">
                <Mail className="w-6 h-6 text-white" />
              </span>
              <Input
                type="email"
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                className="w-full px-4 py-3 border-gray-300"
                placeholder={t('contact.form.email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <Textarea
              {...register('message', { required: 'Este campo es requerido' })}
              className="w-full px-4 py-3 border-gray-300"
              rows={6}
              placeholder={t('contact.form.message')}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
            )}
          </div>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-navy-900 hover:bg-navy-800 px-6 py-3 text-base font-medium"
            >
              {t('contact.form.send')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
