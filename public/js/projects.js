var entries = [],
    numEntries,
    index;

var assignEventHandlers = function() {
   $('.datepicker').pickadate();

   $('.search').on('input', function() {
       var searchResults = index.search( $(this).val() );
       if( searchResults.length == 0 ) {
           // show everything
           for( var i = 0; i < numEntries; i++ ) {
               entries[i].show();
           }
       } else {
           var whiteList = searchResults.map(function(i,e) {
               return searchResults[e].ref;
           });

           for( var curIndex = 0; curIndex < numEntries; curIndex++ ) {
               if( whiteList.indexOf( curIndex.toString() ) == -1 ) {
                   entries[ curIndex ].hide();
               } else {
                   entries[ curIndex ].show();
               }
           }
       } 
   });
}

var setupSearch = function() {
   index = lunr(function() {
       this.field('title', {boost:10});
       this.field('date');
       this.field('skill');
       this.field('location');
       this.field('difficulty');
   });

   var titles = $('.project-title');
   var dates = $('.project-date');
   var skills = $('.project-skill');
   var locations = $('.project-location');
   var difficulties = $('.project-difficulty');
   var fields = 
       titles.add(dates).add(skills).add(locations).add(difficulties).map(function(i, e) {
            return e.innerHTML.trim();
   });
   numEntries = titles.length;

   for( var i = 0; i < fields.length; i+=5 ) {
       index.add({
           id: i/5,
           title: fields[i],
           date: fields[i+1],
           skill: fields[i+2],
           location: fields[i+3],
           difficulty: fields[i+4]
       });
       entries[i/5] =  $('.data-' + i/5);
   }
}

$(function() {
    setupSearch();
    assignEventHandlers();
});
