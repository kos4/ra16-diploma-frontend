export default function Error({message}) {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <h4 className="alert-heading">Ошибка!</h4>
      <p>{message}</p>
    </div>
  );
}