export default function AddModal({errorMessage, title, body, date, submit, cancel}) {
    return (
        <>
            <div className='overlay-style' />
            <div className='modal-container'>
                <div className='modal-form'>
                    <div className='modal-centering'>
                        <label className='modal-heading'>
                            <i className='fa fa-plus-square'></i> Add a New Post
                        </label>
                    </div>
                    <div className='modal-centering'>
                        {errorMessage && <div className='error-message'><i className='fa fa-exclamation-triangle'></i> {errorMessage}</div>}
                    </div>
                    <input className='post-title' type='text' placeholder='Title' onChange={title} />
                    <textarea className='post-content' placeholder='Content' onChange={body}></textarea>
                    <input className='post-date' type='date' onChange={date} />
                    <div className='modal-centering'>
                        <button className='submit-post' onClick={submit}>Submit</button>
                        <button className='cancel-post' onClick={cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}