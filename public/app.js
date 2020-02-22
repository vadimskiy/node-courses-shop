const formatCurrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'usd',
        style: 'currency'
    }).format(price);
};

document.querySelectorAll('.price').forEach(node => {
    node.textContent = formatCurrency(node.textContent);
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
                    if (cart.courses.length) {
                        const html = cart.courses.map(course => {
                            return `
                            <tr>
                                <td>${course.title}</td>
                                <td>${course.count}</td>
                                <td>
                                    <button class="btn btn-small js-remove" data-id="${course.id}">Delete</button>
                                </td>
                            </tr>
                            `;
                        }).join('');
                        cartComponent.querySelector('tbody').innerHTML = html;
                        cartComponent.querySelector('.price').textContent = formatCurrency(cart.price);
                    } else {
                        cartComponent.innerHTML = '<p>Cart is empty</p>'
                    }
              });
        }
    });
}
