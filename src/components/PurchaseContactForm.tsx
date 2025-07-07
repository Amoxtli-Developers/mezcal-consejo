// components/PurchaseContactForm.tsx
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface PurchaseFormData {
    state: string;
    quantity: string;
    amount: number;
    street: string;
    exteriorNumber: string;
    interiorNumber?: string;
    colony: string;
    municipality: string;
    postalCode: string;
    name: string;
    email: string;
    phone: string;
}

interface Props {
    initialState: string;
    initialQuantity?: string;
    onSuccess: () => void;
}

export default function PurchaseContactForm({
    initialState,
    initialQuantity = '',
    onSuccess,
}: Props) {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PurchaseFormData>({
        defaultValues: {
            state: initialState,
            quantity: initialQuantity,
            amount: initialQuantity && !isNaN(+initialQuantity) ? +initialQuantity : undefined,
            street: '',
            exteriorNumber: '',
            interiorNumber: '',
            colony: '',
            municipality: '',
            postalCode: '',
            name: '',
            email: '',
            phone: '',
        }
    });

    const [isSending, setIsSending] = useState(false);

    const onSubmit: SubmitHandler<PurchaseFormData> = async data => {
        setIsSending(true);
        // reconstruye la dirección en un solo string
        const { street, exteriorNumber, interiorNumber, colony, municipality, postalCode, ...rest } = data;
        const fullAddress = `${street} ${exteriorNumber}${interiorNumber ? ` Int. ${interiorNumber}` : ''}, Col. ${colony}, ${municipality}, C.P. ${postalCode}`;

        try {
            const res = await fetch('/api/purchase-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...rest, address: fullAddress }),
            });
            if (!res.ok) throw new Error();

            toast.success(t('purchaseForm.success'), { duration: 3000 });
            reset();
            onSuccess();
        } catch {
            toast.error(t('purchaseForm.error'), { duration: 3000 });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Ocultos */}
            <input type="hidden" {...register('state')} />
            <input type="hidden" {...register('quantity')} />

            {/* ---------- Cantidad / Amount ---------- */}
            <div>
                <label className="block mb-1">{t('purchaseForm.amountLabel')}</label>
                <Input
                    type="number"
                    {...register('amount', { required: true, min: 1 })}
                    placeholder={t('purchaseForm.amountPlaceholder')}
                />
                {errors.amount && (
                    <p className="text-red-500 text-sm">{t('purchaseForm.amountError')}</p>
                )}
            </div>

            {/* ---------- Dirección separada ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calle */}
                <div>
                    <label className="block mb-1">{t('purchaseForm.streetLabel')}</label>
                    <Input
                        {...register('street', { required: true })}
                        placeholder={t('purchaseForm.streetPlaceholder')}
                    />
                    {errors.street && (
                        <p className="text-red-500 text-sm">{t('purchaseForm.required')}</p>
                    )}
                </div>

                {/* Número exterior */}
                <div>
                    <label className="block mb-1">{t('purchaseForm.exteriorNumberLabel')}</label>
                    <Input
                        {...register('exteriorNumber', { required: true })}
                        placeholder={t('purchaseForm.exteriorNumberPlaceholder')}
                    />
                    {errors.exteriorNumber && (
                        <p className="text-red-500 text-sm">{t('purchaseForm.required')}</p>
                    )}
                </div>

                {/* Número interior */}
                <div>
                    <label className="block mb-1">{t('purchaseForm.interiorNumberLabel')}</label>
                    <Input
                        {...register('interiorNumber')}
                        placeholder={t('purchaseForm.interiorNumberPlaceholder')}
                    />
                </div>

                {/* Colonia */}
                <div>
                    <label className="block mb-1">{t('purchaseForm.colonyLabel')}</label>
                    <Input
                        {...register('colony', { required: true })}
                        placeholder={t('purchaseForm.colonyPlaceholder')}
                    />
                    {errors.colony && (
                        <p className="text-red-500 text-sm">{t('purchaseForm.required')}</p>
                    )}
                </div>

                {/* Municipio/Delegación */}
                <div>
                    <label className="block mb-1">{t('purchaseForm.municipalityLabel')}</label>
                    <Input
                        {...register('municipality', { required: true })}
                        placeholder={t('purchaseForm.municipalityPlaceholder')}
                    />
                    {errors.municipality && (
                        <p className="text-red-500 text-sm">{t('purchaseForm.required')}</p>
                    )}
                </div>

                {/* Código Postal */}
                <div>
                    <label className="block mb-1">{t('purchaseForm.postalCodeLabel')}</label>
                    <Input
                        type="text"
                        {...register('postalCode', {
                            required: true,
                            pattern: { value: /^\d{5}$/, message: t('purchaseForm.postalCodeError') }
                        })}
                        placeholder={t('purchaseForm.postalCodePlaceholder')}
                    />
                    {errors.postalCode && (
                        <p className="text-red-500 text-sm">
                            {errors.postalCode.message ?? t('purchaseForm.required')}
                        </p>
                    )}
                </div>
            </div>

            {/* ---------- Resto de campos ---------- */}
            <div>
                <label className="block mb-1">{t('purchaseForm.nameLabel')}</label>
                <Input {...register('name', { required: true })} placeholder={t('purchaseForm.namePlaceholder')} />
                {errors.name && <p className="text-red-500 text-sm">{t('purchaseForm.required')}</p>}
            </div>

            <div>
                <label className="block mb-1">{t('purchaseForm.emailLabel')}</label>
                <Input
                    type="email"
                    {...register('email', {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    placeholder={t('purchaseForm.emailPlaceholder')}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">
                        {errors.email.type === 'pattern' ? t('purchaseForm.emailError') : t('purchaseForm.required')}
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-1">{t('purchaseForm.phoneLabel')}</label>
                <Input type="tel" {...register('phone', { required: true, minLength: 7 })} placeholder={t('purchaseForm.phonePlaceholder')} />
                {errors.phone && <p className="text-red-500 text-sm">{t('purchaseForm.phoneError')}</p>}
            </div>

            {/* ---------- Botón enviar ---------- */}
            <div className="flex justify-end">
                <Button type="submit" disabled={isSending}>
                    {isSending ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : t('purchaseForm.submit')}
                </Button>
            </div>
        </form>
    );
}
