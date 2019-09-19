import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import Loading from 'react-loading';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList, ContainerLoading } from './styles';

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
  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    /**
     * Funcao utilizada para disparar uma action ao redux
     * toda action tem um type unico
     */
    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount, loading } = this.props;

    console.tron.log(loading);

    return (
      <div style={{ position: 'relative' }}>
        {loading && (
          <ContainerLoading>
            <Loading type="spin" color="#7159c1" size={90} />
          </ContainerLoading>
        )}
        <ProductList>
          {products.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />

              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>

              <button
                type="button"
                onClick={() => this.handleAddProduct(product.id)}
              >
                <div>
                  <MdShoppingCart size={16} color="#FFF" />
                  {amount[product.id] || 0}
                </div>
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          ))}
        </ProductList>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
  loading: state.loading.show,
});

// transforma actions em propriedades do componente
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
