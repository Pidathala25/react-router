function ProductCard(props) {
  return (
    <div>
      <img
        src={props.image}
        alt={props.title}
        width="200"
      />

      <h3>{props.title}</h3>

      <p>${props.price}</p>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;