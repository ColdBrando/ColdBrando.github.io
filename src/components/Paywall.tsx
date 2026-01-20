import { useTranslation } from 'react-i18next';
import './Paywall.css';

export default function Paywall() {
  const { t } = useTranslation();

  return (
    <div className="paywall">
      <div className="paywall-content">
        <h3 className="paywall-title">{t('paywall.title')}</h3>
        <p className="paywall-message">{t('paywall.message')}</p>
        <button className="paywall-button" disabled>
          {t('paywall.cta')}
        </button>
        <p className="paywall-pending">{t('paywall.paymentPending')}</p>
      </div>
    </div>
  );
}
