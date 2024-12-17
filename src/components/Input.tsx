import React from "react";

interface InputBoxProps {
    label: string;
    amount: number;
    onAmountChange?: (value: number) => void;
    onCurrencyChange?: (currency: string) => void;
    currencyOption?: string[];
    selectCurrency?: string;
    amountDisable?: boolean;
    currencyDisable?: boolean;
    className?: string;
    fromSign? : string;
    ToSign?: string;
}


const InputBox: React.FC<InputBoxProps> = ({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOption = [],
    selectCurrency = 'usd',
    amountDisable = false,
    currencyDisable = false,
    className = "",
    fromSign = '',
    ToSign = ''
}) => {
    return (
        <div className={` rounded-lg text-sm flex pr-1 sm:pr-10 ${className}`}>
            <div >
                <label className="text-black/40 mb-2 block text-xs">
                    {label}
                </label>
                <select
                    className="rounded-lg py-1 cursor-pointer text-base sm:text-xl font-normal outline-none "
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOption.map((currency, index)=> (
                        <option key={index} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <hr/>
                <div className="flex items-center text-4xl sm:text-6xl">
                    <span className="mr-2">{fromSign }</span>
                    <span className="mr-2">{ToSign  }</span>
                <input
                    className="outline-none text-black/40 w-full bg-transparent my-8"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    />
                    </div>
            </div>
            
        </div>
    );
};

export default InputBox;
