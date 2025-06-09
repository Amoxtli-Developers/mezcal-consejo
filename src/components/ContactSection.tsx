'use client';

import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Form data:', data);
    alert('Mensaje enviado correctamente!');
    reset();
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-base text-navy-700">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                {t('contact.form.name')}
              </label>
              <Input
                {...register('name', { required: 'Este campo es requerido' })}
                className="w-full"
                placeholder={t('contact.form.name')}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                {t('contact.form.email')}
              </label>
              <Input
                type="email"
                {...register('email', { 
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                className="w-full"
                placeholder={t('contact.form.email')}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              {t('contact.form.message')}
            </label>
            <Textarea
              {...register('message', { required: 'Este campo es requerido' })}
              className="w-full"
              rows={6}
              placeholder={t('contact.form.message')}
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>
          
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-navy-900 hover:bg-navy-800 px-6 py-3 text-base font-semibold"
            >
              {t('contact.form.send')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
