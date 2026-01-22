const removeItemsUntilCartIsEmpty = (cart) => {
  const removeNextItem = () => {
    cart.cartRows().then(($rows) => {
      if ($rows.length === 0) {
        return
      }

      const currentCount = $rows.length
      cart.removefromCart().first().check()
      cart.cartRows().should('have.length', currentCount - 1)
      removeNextItem()
    })
  }

  removeNextItem()
}

export default removeItemsUntilCartIsEmpty
