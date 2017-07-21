function serveDirectory(filename) {
    var files = fs.readdirSync(filename);
    files.push("..", ".");

    var html = files.map(function(name) {
        try {
            var stat = fs.statSync(filename + "/" + name);  //statSync รีเทิร์น obj ของ stat()
        } catch(e) {}
        //สร้างindex บอกตน.
        var index = name == "." ? 2 : name == ".." ? 3 : stat.isDirectory() ? 1 : 0;
        return { name: name, index: index };
    }).filter(Boolean).sort(function(a, b) {
        if (a.index == b.index)
            return a.name.localeCompare(b.name);
        return b.index - a.index;
    }).map(function(stat) {
        console.log('stat',stat)
        var name = stat.name;
        if (stat.index) 
          name = "/"+name;
        return stat.files
    })
}

/////////////////////////////////
var files = {
    'folder': {
        type: 'directory'
        parent: null
        path: filelist.path,
        children: {
            'eiei.html': {
                type: 'file'
                path: '/ja/eiei.html'
            }
        }
    },

    'files': {
        type: 'file'
        path: filelist.path
 }
}

files['index.html'].type
///////////////////////////////