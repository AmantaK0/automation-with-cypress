const parseTotalSum = (totalPrice) => {
    return totalPrice.then(($total) => {
        const totalText = $total.text().replace('$', '').trim()
        return Number(totalText)
    })
}

export default parseTotalSum