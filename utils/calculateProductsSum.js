const calculateTotalSum = (prices) => {
    let sum = 0

    return prices.each(($price) => {
        const priceText = $price.text().replace('$', '').trim()
        sum += Number(priceText)
    }).then(() => {
        return sum
    })
}

export default calculateTotalSum