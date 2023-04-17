class LocationSerializer < ActiveModel::Serializer
  attributes :id, :longitude, :latitude, :lat_lng
end
