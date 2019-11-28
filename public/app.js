document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('en-US', {
        currency: 'usd',
        style: 'currency'
    }).format(node.textContent)
});

const cartComponent = document.querySelector('#cart');
if (cartComponent) {
    cartComponent.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;

            fetch('/cart/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
              .then(cart => {
                  console.log(cart);
              });
        }
    });
}
