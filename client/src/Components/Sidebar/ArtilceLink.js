import { Link } from 'react-router-dom'

export default function ArtilceLink({name,id}) {
  return<Link to ={id}>{name}</Link>
}
