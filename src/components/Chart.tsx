import React, { useEffect, useRef } from 'react';

interface ChartProps {
  currency: string; // The selected currency pair (e.g., 'USDJPY')
}

const Chart: React.FC<ChartProps> = ({ currency }) => {
  const widgetContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetContainer.current) {
      widgetContainer.current.innerHTML = ''; // Clear previous content
    }

    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.setAttribute('data-type', 'quotes-widget');
    script.src = 'https://c.mql5.com/js/widgets/quotes/widget.js?v=1';

    // Create a unique ID for the chart
    const uniqueId = `quotesWidgetChart-${currency}`;

    // Chart configuration
    const config = {
      type: 'chart',
      filter: currency,
      period: 'W1',
      width: 780,
      height: 200,
      id: uniqueId, // Unique ID based on the currency
    };

    script.innerHTML = JSON.stringify(config);

    if (widgetContainer.current) {
      widgetContainer.current.appendChild(script);
    }

    return () => {
      if (widgetContainer.current) {
        widgetContainer.current.innerHTML = '';
      }
    };
  }, [currency]);

  return (
    <div className='outline-none border-none' id={`quotesWidgetChart-${currency}`} ref={widgetContainer}>
      <p>Loading chart for {currency}...</p>
    </div>
  );
};

export default Chart;
