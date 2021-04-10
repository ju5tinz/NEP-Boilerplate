// render child if test is true otherwise null
const If = ({test, children}) => (
  test ? <>{children}</> : null
)

export default If