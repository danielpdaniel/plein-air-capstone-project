function StudyCard({ study }){
    console.log(study)
return (
    <div className="studyCard">
        {study.attached_images.map(image =>  <img key={image} src={image}/>)}
        <p>{study.caption}</p>
    </div>
)
}

export default StudyCard