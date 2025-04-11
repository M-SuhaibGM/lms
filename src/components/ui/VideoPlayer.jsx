

const VideoPlayer = ({ videoName }) => {

    return (
        <div>
            {videoName ? (
                <video controls width="100%" className='border-4 border-sky-700  rounded-2xl' >
                    <source src={videoName} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <video width={"100%"} controls height={"100%"} className='border-4 border-sky-700 flex justify-center relative  bg-slate-400 rounded-2xl' />
            )}
        </div>
    );
};

export default VideoPlayer