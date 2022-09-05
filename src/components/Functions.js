const PriceFormatter = (num) => {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        });
        
    return num = formatter.format(num)
} 

export {PriceFormatter} 