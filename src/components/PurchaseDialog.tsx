// components/PurchaseDialog.tsx
'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import PurchaseContactForm from './PurchaseContactForm';
import { ArrowLeft } from 'lucide-react';

const mexicanStates = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
    'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
    'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
    'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
    'Yucatán', 'Zacatecas'
];

const purchaseLinks: Record<string, string> = {
    '1': 'https://shop.example.com/buy/1',
    '2': 'https://shop.example.com/buy/2',
    '3': 'https://shop.example.com/buy/3',
    '4': 'https://shop.example.com/buy/4',
    'case': 'https://shop.example.com/buy/case',
};

interface PurchaseDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function PurchaseDialog({ open, onClose }: PurchaseDialogProps) {
    const { t } = useTranslation();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [state, setState] = useState('');
    const [quantity, setQuantity] = useState<string>('');

    const normalized = state.toLowerCase();
    const isCdMxOrEdomex = normalized === 'ciudad de méxico' || normalized === 'estado de méxico';

    const handleCloseDialog = () => {
        setStep(1);
        setState('');
        setQuantity('');
        onClose();
    };

    const handleStateNext = () => {
        if (!state) return;
        if (isCdMxOrEdomex) {
            // usuarios CDMX/Edomex pasan al selector de cantidad
            setStep(2);
        } else {
            // otros estados van directo al formulario con quantity="more"
            setQuantity('more');
            setStep(3);
        }
    };

    const handleQuantityNext = () => {
        if (!quantity) return;
        if (quantity === 'more') {
            setStep(3);
        } else {
            window.location.href = purchaseLinks[quantity];
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else if (step === 3) {
            if (isCdMxOrEdomex && quantity === 'more') {
                setStep(2);
            } else {
                setStep(isCdMxOrEdomex ? 2 : 1);
            }
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto relative">
                {/* Header con navegación */}
                <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {(step === 2 || step === 3) && (
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={handleBack}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <h2 className="text-xl font-semibold">
                            {step === 1 && t('purchaseDialog.stateTitle')}
                            {step === 2 && t('purchaseDialog.quantityTitle')}
                            {step === 3 && t('purchaseDialog.purchaseRequest')}
                        </h2>
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                        onClick={handleCloseDialog}
                    >
                        ✕
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-4">
                    {/* Paso 1: elegir estado */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <select
                                className="w-full border rounded px-3 py-2 text-sm"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">{t('purchaseDialog.selectState')}</option>
                                {mexicanStates.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Paso 2: seleccionar cantidad (solo CDMX/Edomex) */}
                    {step === 2 && (
                        <div className="space-y-3">
                            {['1', '2', '3', '4'].map((n) => (
                                <label key={n} className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="quantity"
                                        value={n}
                                        checked={quantity === n}
                                        onChange={() => setQuantity(n)}
                                        className="w-4 h-4"
                                    />
                                    {t('purchaseDialog.bottle', { count: Number(n) })}
                                </label>
                            ))}
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="radio"
                                    name="quantity"
                                    value="case"
                                    checked={quantity === 'case'}
                                    onChange={() => setQuantity('case')}
                                    className="w-4 h-4"
                                />
                                {t('purchaseDialog.case')}
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="radio"
                                    name="quantity"
                                    value="more"
                                    checked={quantity === 'more'}
                                    onChange={() => setQuantity('more')}
                                    className="w-4 h-4"
                                />
                                {t('purchaseDialog.more')}
                            </label>
                        </div>
                    )}

                    {/* Paso 3: formulario de contacto */}
                    {step === 3 && (
                        <div className="space-y-4">
                            <PurchaseContactForm
                                initialState={state}
                                initialQuantity={quantity}
                                onSuccess={handleCloseDialog}
                            />
                        </div>
                    )}
                </div>

                {/* Footer con botones */}
                {step !== 3 && (
                    <div className="sticky bottom-0 bg-white border-t px-4 py-3">
                        <div className="flex justify-end gap-3">
                            {/* Botones principales */}
                            {step === 1 && (
                                <>
                                    <Button variant="outline" onClick={handleCloseDialog} size="sm">
                                        {t('purchaseDialog.close')}
                                    </Button>
                                    <Button onClick={handleStateNext} disabled={!state} size="sm">
                                        {t('purchaseDialog.next')}
                                    </Button>
                                </>
                            )}

                            {step === 2 && (
                                <Button onClick={handleQuantityNext} disabled={!quantity} size="sm">
                                    {quantity === 'more' ? t('purchaseDialog.continue') : t('purchaseDialog.buy')}
                                </Button>
                            )}


                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}