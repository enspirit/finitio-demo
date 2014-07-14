require 'json'
require 'path'
require 'wlang'

here = Path.dir
data = here.glob('*').map do |folder|
  next unless folder.directory?
  match = /^(\d+)-(.*?)$/.match(folder.basename.to_s)
  data = { id: match[2], index: match[1].to_i }
  data.merge!((folder/'info.yml').load)
  data.merge!(schema: (folder/'schema.fio').read)
  data.merge!(data: (folder/'data.json').read)
  data.merge!(context: (folder/'context.js').read) if (folder/'context.js').exists?
  data
end.compact

TPL = <<EOF
angular.module( 'finitio.examples', [
])

.factory( 'examples', function() {
  return +{data};
})

;
EOF

puts WLang::Html.render TPL, data: data.to_json
