import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    /**
     * Poderia ter sido utilizado na listagem o formatPrice porem, como ele é uma funcao
     * ele executaria em todo item, e com isso formataria items ja formatado
     * alem de ficar chamando o render toda vez que formatasse
     */
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  /**
   * Todo componente ligado ao estado utilizando connect
   * automaticamente recebe uma propriedade chamada dispatch
   * que dispara uma action ao redux
   */
  handleAddProduct = product => {
    const { dispatch } = this.props;

    /**
     * Funcao utilizada para disparar uma action ao redux
     * toda action tem um type unico
     */
    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />

            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product)}
            >
              <div>
                <MdShoppingCart size={16} color="#FFF">
                  3
                </MdShoppingCart>
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

export default connect()(Home);
