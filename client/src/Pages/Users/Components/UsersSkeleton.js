import './UsersSkeleton.css'

export default function UsersSkeleton() {
  return (
    <div className='skeleton-table-container'>
        <div className='row'>
            <div className='skeleton-table-top-left'></div>
            <div className='skeleton-table-top-mid'></div>
            <div className='skeleton-table-top-mid'></div>
            <div className='skeleton-table-top-right'></div>
        </div>
        <div className='row'>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
        </div>
        <div className='row'>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
        </div>
        <div className='row'>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
        </div>
        <div className='row'>
            <div className='skeleton-table-bottom-left'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-mid'></div>
            <div className='skeleton-table-bottom-right'></div>
        </div>
    </div>
  )
}
