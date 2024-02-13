import './Loader.scss'
export const Loader = () => {
  return (
    <div className="container">
      <div className="loadContainer">
        <div className="loadInner">
          {Array.from({length: 4}).map((_i, order) => (
            <div className="loadCircle" key={order}>
              <div className="loadCircleInner" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}