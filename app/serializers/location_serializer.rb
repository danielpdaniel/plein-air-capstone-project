class LocationSerializer < ActiveModel::Serializer
  attributes :id, :longitude, :latitude, :lat_lng

  belongs_to :study
end
