'use client';

import { useState } from 'react';

import Script from 'next/script';

import { urls } from 'config';
import { plans } from 'config/plans';
import { toast } from 'sonner';

import PaymentModal from 'components/modal/payment';

import { formatDate } from 'lib/date';

import { PaymentType, UserModified } from 'types/data';

declare global {
  interface Window {
    createLemonSqueezy: any;
    LemonSqueezy: {
      Url: {
        Close: () => void;
        Open: (checkoutUrl: string) => void;
      };
      Setup: ({ eventHandler }: { eventHandler: any }) => void;
    };
  }
}

const paymentEvents = {
  success: 'Checkout.Success',
  closed: 'PaymentMethodUpdate.Closed',
};

type OrderType = {
  data: {
    attributes: {
      identifier: string;
      store_id: string;
      order_number: string;
      status: string;
    };
  };
};

const checkoutMonthlyUrl = `https://bmrkcc.lemonsqueezy.com/checkout/buy/${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_ID_MONTHLY}?embed=1&dark=1`;
const checkoutYearlyUrl = `https://bmrkcc.lemonsqueezy.com/checkout/buy/${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_ID_YEARLY}?embed=1&dark=1`;

export default function PlanUpgradeButton() {
  const [open, setOpen] = useState(false);

  const onPaymentSuccess = async ({ order }: { order: OrderType }) => {
    const { attributes } = order.data;
    try {
      const res = await fetch(`${urls.api}/account/upgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billing_cycle_start_date: formatDate(new Date()),
          plan_status: plans.pro.type,
          order_info: {
            identifier: attributes.identifier,
            store_id: attributes.store_id,
            number: attributes.order_number,
            status: attributes.status,
          },
        } as UserModified),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || res.statusText);
      } else {
        toast.success(
          `Your payment is successful, page will reload in 5 seconds.`,
        );
        setTimeout(() => window.location.reload(), 5000);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const eventHandler = async ({ event, data }: { event: any; data: any }) => {
    if (event === paymentEvents.success && window.LemonSqueezy) {
      await onPaymentSuccess(data);
    }
    return false;
  };

  const setupLemonSqueezy = () => {
    window.createLemonSqueezy?.();
    window.LemonSqueezy?.Setup?.({ eventHandler });
  };

  const onClick = (type: PaymentType) => {
    window.LemonSqueezy?.Url?.Open?.(
      type === 'monthly' ? checkoutMonthlyUrl : checkoutYearlyUrl,
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="items-center h-[40px] w-[91px] tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:border-blue-300 rounded-full text-white border border-blue-600 focus:outline-0 text-sm flex justify-center py-2 px-3 transition-colors bg-blue-600 hover:bg-blue-700  active:bg-blue-700"
      >
        Upgrade
      </button>

      <Script
        src="https://app.lemonsqueezy.com/js/lemon.js"
        async
        onLoad={setupLemonSqueezy}
      />
      {open ? (
        <PaymentModal open={open} onHide={setOpen} onClick={onClick} />
      ) : null}
    </>
  );
}
