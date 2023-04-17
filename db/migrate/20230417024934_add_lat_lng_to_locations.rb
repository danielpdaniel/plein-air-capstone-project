class AddLatLngToLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :locations, :lat_lng, :string
  end
end
