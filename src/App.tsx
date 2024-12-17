import { useState } from 'react';
import './App.css';
import InputBox from './components/Input';
import useCurrecyInfo from './hooks/useCurrencyInfo';
import { currencySymbols } from './components/currencySymbol';
import Chart from './components/Chart';
import { IoIosSwap,} from "react-icons/io";
import { IoSwapVertical } from "react-icons/io5";



function App() {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [chartCurrency, setChartCurrency] = useState<string>('EURUSD'); // Default chart currency pair

  const currencyInfo = useCurrecyInfo(fromCurrency);

  const fromCurrencySymbol = currencySymbols[fromCurrency] || fromCurrency;
  const toCurrencySymbol = currencySymbols[toCurrency] || toCurrency;

  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const convert = () => {
    if (currencyInfo[toCurrency]) {
      const convertedAmt = amount * currencyInfo[toCurrency];
      setConvertedAmount(parseFloat(convertedAmt.toFixed(2)));
      // Update chart currency after conversion
      setChartCurrency(`${fromCurrency}${toCurrency}`);

    }
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div
      className="w-full h-screen flex justify-center roboto px-2 sm:px-5 my-10"
    >
      <section className='max-w-[1200px] max-h-screen'>
        <div className='w-full text-center font-light tracking-widest text-3xl sm:text-5xl'>
          <h1 className=''>Currency Convertor</h1>
        </div>

        <div className='flex justify-between items-center mt-6 m-x2 sm:m-x8'>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className='sm:flex justify-between items-center'>

              {/* Left Side */}
              <div className=''>
                <div className="w-full mb-4 text-3xl pl-2">
                  <InputBox
                    label={`From `}
                    amount={amount}
                    onAmountChange={(value) => setAmount(value)}
                    onCurrencyChange={(currency) => setFromCurrency(currency)}
                    currencyOption={options}
                    selectCurrency={fromCurrency}
                    fromSign={fromCurrencySymbol}
                  />
                </div>
              </div>



              <div className="w-full my-5 text-center sm:hidden">
                <button
                  type="button"
                  onClick={swap}
                  className='h-10 w-10'
                >
                 <IoSwapVertical 
                 height={15}
                 width={15}
                 />
                </button>
              </div>


              <div className="w-44 my-5 text-center hidden sm:block">
                <button
                  type="button"
                  onClick={swap}
                  className='h-10 w-10'
                >
                 <IoIosSwap 
                 height={15}
                 width={15}
                 />
                </button>
              </div>




              {/* Right Side */}

              <div className='flex items-center'>

                <div className="w-full mb-4 text-3xl pl-2">
                  <InputBox
                    label={`To `}
                    amount={convertedAmount}
                    onCurrencyChange={(currency) => setToCurrency(currency)}
                    currencyOption={options}
                    selectCurrency={toCurrency}
                    ToSign={toCurrencySymbol}
                  />
                </div>
              </div>
            </div>


            

            <div className='w-full text-center'>
              <button
                type="submit"
                className="max-w-44 bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
              </button>
            </div>


          </form>
        </div>

        <div className='max-w-full text-center  justify-center my-5 hidden md:block md:flex'>
          <Chart currency={chartCurrency} />
        </div>
      </section>


    </div>
  );
}

export default App;
















/*
      <div className="max-w-[1200px] max-h-[1200px]">
            <h1 className="text-4xl tracking-[7px]">Currency Converter</h1>
        <section className="flex h-screen justify-between sm:flex sm:justify-around items-center w-full space-x-10">
          // Left Side 
          <div className="hidden md:block">
          </div>

          // Right Side 
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label={`From (${fromCurrencySymbol})`}
                  amount={amount}
                  onAmountChange={(value) => setAmount(value)}
                  onCurrencyChange={(currency) => setFromCurrency(currency)}
                  currencyOption={options}
                  selectCurrency={fromCurrency}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBox
                  label={`To (${toCurrencySymbol})`}
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => setToCurrency(currency)}
                  currencyOption={options}
                  selectCurrency={toCurrency}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
              </button>
            </form>
          </div>
        </section>

        // Render Chart 
        
        <div className="mt-10">
          <Chart currency={chartCurrency}/>
        </div>
      </div> */

































/*
 
<div className="w-full h-screen flex justify-center items-center"
style={{
  background: "linear-gradient(to right top, #ff9a8b, #ff6a88)", // Light red (#ffc1c1) to dark red (#8b0000)
}}>
  <p>
Convert from {fromCurrencySymbol} {fromCurrency} to {toCurrencySymbol} {toCurrency}
</p>

  <div  className=" max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
  <h1 className='roboto text-5xl tracking-[10px]'>Currency Convertor</h1>
  </div>
  <div className='h-[300px] w-[2px] bg-slate-300'>
  </div>
  <div className="w-full border-cyan-200">
    <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          convert();
        }}
      >
        <div className="w-full mb-1">
          <InputBox
               label={`From (${fromCurrencySymbol})`}
            amount={amount}
            onAmountChange={(value) => setAmount(value)}
            onCurrencyChange={(currency) => setFromCurrency(currency)}
            currencyOption={options} // Pass currency options here
            selectCurrency={fromCurrency}
          />
        </div>
        <div className="relative w-full h-0.5">
          <button
            type="button"
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
            onClick={swap}
          >
            Swap
          </button>
        </div>
        <div className="w-full mt-1 mb-4">
          <InputBox
              label={`To (${toCurrencySymbol})`}
            amount={convertedAmount}
            onCurrencyChange={(currency) => setToCurrency(currency)}
            currencyOption={options} // Pass currency options here
            selectCurrency={toCurrency}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
        >
          Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
        </button>
      </form>
    </div>
  </div>
</div>*/
