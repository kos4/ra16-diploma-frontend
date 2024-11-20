export default function Error({message, onClickHandler = null}) {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <h4 className="alert-heading">Ошибка!</h4>
      <p>{message}</p>
      {onClickHandler && <button type="button" onClick={onClickHandler}>Повторить запрос</button>}
    </div>
  );
}