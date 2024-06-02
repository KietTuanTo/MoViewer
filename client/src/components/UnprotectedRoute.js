import ButtonAppBar from "./Navbar"

export default function UnprotectedRoute({ children }) {
  return (
    <>
      <ButtonAppBar isProtected={false} />
      {children}
    </>
  )
}