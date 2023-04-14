function StudyCard({ study }){
return (
    <div>
        {study.attached_images.map(image => <img key={image} src={image}/>)}
    </div>
)
}

export default StudyCard