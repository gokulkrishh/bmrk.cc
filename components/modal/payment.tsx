'use client';

import { useState } from 'react';

import { messages, plans } from 'config';
import { ArrowRight } from 'lucide-react';

import { CheckIcon, Logo } from 'components/icons';
import Loader from 'components/loader';
import PlanTooltip from 'components/settings/plan-tooltip';
import { Badge } from 'components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from 'components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';

import { PaymentType } from 'types/data';

type PaymentModalType = {
  open: boolean;
  onHide: (open: boolean) => void;
  onClick: (type: PaymentType) => void;
};

export default function PaymentModal({
  open,
  onHide,
  onClick,
}: PaymentModalType) {
  const [type, setType] = useState('yearly');
  const planPrice =
    type === 'yearly' ? plans.pro.pricing.yearly : plans.pro.pricing.monthly;

  return (
    <Dialog open={open} onOpenChange={() => onHide(false)}>
      <DialogContent className="sm:max-w-md pt-2 gap-0 py-0 px-0 max-w-[calc(100%-6px)]">
        <DialogHeader className="flex my-0 pb-0 flex-col justify-center border-b py-4 items-center">
          <Logo className="w-16 h-16" />
          <p className="font-medium !mt-3">Upgrade to Pro Plan</p>
          <p className="text-muted-foreground text-center">
            Unlock the full potential with Pro plan.
          </p>
        </DialogHeader>
        <div className="px-4 flex items-center flex-col bg-neutral-50 dark:bg-neutral-900 rounded-br-xl rounded-bl-xl">
          <div className="flex gap-6 w-full justify-center mt-6">
            <Select defaultValue="pro">
              <SelectTrigger className="w-full mx-2 max-w-[160px]">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pro">Pro Plan</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="yearly" onValueChange={setType}>
              <SelectTrigger className="w-full mx-2 max-w-[160px]">
                <SelectValue placeholder="Yearly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:w-[390px] w-full items-star gap-3 justify-center my-4">
            <div className="text-gray-700 gap-2 dark:text-white flex items-center font-medium">
              Pay {type === 'yearly' ? 'Yearly' : 'Monthly'}{' '}
              <Badge
                variant="outline"
                className="py-1 mt-2 inline-flex items-center"
              >
                ${planPrice} yearly (no auto-renewal)
              </Badge>
            </div>
            <div className="text-white mt-2 flex items-center font-normal">
              <CheckIcon className="text-green-500" />{' '}
              {plans.pro.limit.bookmarks} bookmarks/mo{' '}
              <PlanTooltip
                className="ml-1 relative -top-1"
                text={messages.usageLimitRenewal}
              />
            </div>
            <div className="text-white flex items-center font-normal">
              <CheckIcon className="text-green-500" />
              {plans.pro.limit.imports} times unlimited bookmarks import.
              <PlanTooltip
                className="ml-1 relative -top-1"
                text={messages.importLimitWarning(plans.pro.limit.imports)}
              />
            </div>
            <div className="text-white flex items-center font-normal">
              <CheckIcon className="text-green-500" /> {plans.pro.limit.tags}{' '}
              tags
            </div>
            <div className="text-white flex items-center font-normal">
              <CheckIcon className="text-green-500" />{' '}
              {plans.pro.limit.favorites} favorite bookmarks
            </div>
            <div className="text-white flex items-center font-normal">
              <CheckIcon className="text-green-500" /> Export bookmarks as
              CSV/HTML
            </div>
            <div className="text-white flex items-center font-normal">
              <CheckIcon className="text-green-500" /> Email Support
            </div>
          </div>
          <DialogFooter className="w-full flex mb-6 px-6 mt-1">
            <button
              onClick={() => {
                onHide(false);
                onClick(type as PaymentType);
              }}
              className="items-center group/pay [text-transform:capitalize] w-full h-[40px] tracking-wide disabled:cursor-not-allowed disabled:border-border rounded-xl text-white border border-blue-600 focus:outline-0 text-sm flex justify-center py-2 px-3 transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-blue-700 active:bg-blue-700"
            >
              Pay one-time
              <ArrowRight className="ml-1.5 w-4 h-4 text-white shrink-0 transition-all group-hover/pay:translate-x-0.5" />
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
