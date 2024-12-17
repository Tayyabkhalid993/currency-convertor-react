import { useEffect, useState } from 'react';

const useCurrencyInfo = (baseCurrency: string) => {
  const [currencyData, setCurrencyData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        if (!response.ok) throw new Error("Failed to fetch currency data");
        const data = await response.json();
        setCurrencyData(data.rates); // Ensure API response has `rates`
      } catch (error) {
        console.error("Error fetching currency data:", error);
        setCurrencyData({});
      } finally {
        setLoading(false);
      }
    };

    if (baseCurrency) {
      fetchCurrencyData();
    }
  }, [baseCurrency]);

  return loading ? {} : currencyData;
};

export default useCurrencyInfo;
