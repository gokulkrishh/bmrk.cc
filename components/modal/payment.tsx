'use client';

import { use, useState } from 'react';

import { plans } from 'config';
import { ArrowRight } from 'lucide-react';

import { CheckIcon, Logo } from 'components/icons';
import Loader from 'components/loader';
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
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('yearly');
  const planPrice =
    type === 'yearly' ? plans.pro.pricing.yearly : plans.pro.pricing.monthly;

  return (
    <Dialog open={open} onOpenChange={() => onHide(false)}>
      <DialogContent className="sm:max-w-md pt-2 gap-0 py-0 px-0 max-w-[calc(100%-6px)]">
        <DialogHeader className="flex my-0 pb-0 flex-col justify-center border-b py-4 items-center">
          <Logo className="w-16 h-16" />
          <p className="font-medium !mt-3">Upgrade to Pro Plan</p>
          <p className="text-muted-foreground">
            Enjoy more limits with all pro features.
          </p>
        </DialogHeader>
        <div className="px-4 flex items-center flex-col bg-neutral-50 dark:bg-neutral-900 rounded-br-xl rounded-bl-xl">
          <div className="flex max-w-md gap-6 w-full justify-center mt-6">
            <Select defaultValue="pro">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pro">Pro Plan</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="yearly" onValueChange={setType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Yearly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex max-w-xs -ml-3 flex-col w-full items-center gap-4 justify-center my-4">
            <div className="flex w-full flex-col gap-2.5 mt-2 tracking-wide shrink-0">
              <div className="text-gray-700 gap-2 dark:text-white flex items-center font-medium">
                Pay {type === 'yearly' ? 'Yearly' : 'Monthly'}{' '}
                <Badge
                  variant="outline"
                  className="py-1 inline-flex items-center"
                >
                  ${planPrice}, billed one time only.
                </Badge>
              </div>
              <p className="text-gray-600 dark:text-white flex items-center font-normal">
                <CheckIcon className="text-green-500" />{' '}
                {plans.pro.limit.bookmarks} bookmarks/mo
              </p>
              <p className="text-gray-600 dark:text-white flex items-center font-normal">
                <CheckIcon className="text-green-500" /> {plans.pro.limit.tags}{' '}
                tags
              </p>
              <p className="text-gray-600 dark:text-white flex items-center font-normal">
                <CheckIcon className="text-green-500" />{' '}
                {plans.pro.limit.favorites} favorite bookmarks
              </p>
              <p className="text-gray-600 dark:text-white flex items-center font-normal">
                <CheckIcon className="text-green-500" /> Export bookmarks as
                CSV/HTML
              </p>
              <p className="text-gray-600 dark:text-white flex items-center font-normal">
                <CheckIcon className="text-green-500" /> Email Support
              </p>
            </div>
          </div>
          <DialogFooter className="max-w-xs w-full flex mb-6 mt-1">
            <button
              onClick={() => {
                onHide(false);
                onClick(type as PaymentType);
              }}
              className="items-center [text-transform:capitalize] max-w-xs w-full h-[40px] tracking-wide disabled:cursor-not-allowed disabled:border-border rounded-xl text-white border border-blue-600 focus:outline-0 text-sm flex justify-center py-2 px-3 transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-blue-700 active:bg-blue-700"
            >
              {loading ? <Loader /> : null} Pay {type}{' '}
              <ArrowRight className="ml-1.5 w-4 h-4 text-white shrink-0" />
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
