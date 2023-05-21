class TagSerializer < ActiveModel::Serializer
  attributes :id, :tag_name
  has_many :studies
end
