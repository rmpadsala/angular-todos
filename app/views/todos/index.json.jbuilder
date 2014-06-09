json.array!(@todos) do |todo|
  json.extract! todo, :id, :title, :complete, :todo_group_id
end
