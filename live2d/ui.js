var selectedModel
function updateViewer(model) {
  if(model && typeof model == 'string') selectedModel = model
  var viewer = document.getElementsByTagName('iframe')[0],
      size = $('#size-slider').slider('value')
  viewer.src = 'viewer.html?mN=' + selectedModel + '&size=' + size
  viewer.style.width = size + 'px'
  viewer.style.height = size + 'px'
  var code = viewer.outerHTML.replace('viewer.html', document.location.toString() + 'viewer.html')
  document.getElementById('embed').innerHTML = code.replace(/</g, '&lt')
  $('#direct-link').attr('href', viewer.src)
  $('#direct-link').html(viewer.src)
}
var childs
function loadChilds(callback) {
  $.getJSON('../data/childs.json', function(_childs) {
    childs = _childs
    callback()
  })
}
function getLabel(id, details) {
  var parts = id.split('_'),
      child = childs[parts[0]],
      v = parts[1],
      variant = child && child.variants[v]
  return id + ' ' + (child
    ? ((variant && variant.name)
      ? variant.name
      : (child.name || '???') + ' ' + (v == '00' ? 'Story'
        : v == '01' ? 'E-A Class'
        : v == '02' ? 'S Class'
        : 'Special'
      ))
    : '???') +
    (details.modder ? ' ' + details.modder : '') +
    (details.name ? ' ' + details.name : '')
}
function loadData(callback) {
  $.getJSON('./assets.json', function(data) {
    $.each(data, function(id, details) {
      selectedModel = selectedModel || id
      $('select').append(
        '<option value="' + id + '">' + getLabel(id, details) + '</option>'
      )
    })
    callback()
  })
}
function createComboBox() {
  $.widget('custom.combobox', {
    _create: function() {
      this.wrapper = $('<span>').addClass('custom-combobox').insertAfter( this.element )
      this.element.hide()
      this._createAutocomplete()
      this._createShowAllButton()
    },

    _createAutocomplete: function() {
      var selected = this.element.children(':selected'),
      value = selected.val() ? selected.text() : ""

      this.input = $('<input>')
      .appendTo( this.wrapper )
      .val( value )
      .attr('title', '')
      .addClass('custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left')
      .autocomplete({
        delay: 0,
        minLength: 0,
        source: $.proxy( this, '_source')
      })
      .tooltip({classes: {"ui-tooltip": "ui-state-highlight"}})

      this._on( this.input, {
        autocompleteselect: function( event, ui ) {
          ui.item.option.selected = true
          this._trigger('select', event, {
            item: ui.item.option
          })
        },
        autocompletechange: "_removeIfInvalid"
      })
    },
    _createShowAllButton: function() {
      var input = this.input,
      wasOpen = false

      $('<a>')
      .attr('tabIndex', -1 )
      .attr('title', 'Show All Items')
      .tooltip()
      .appendTo( this.wrapper )
      .button({
        icons: {
          primary: "ui-icon-triangle-1-s"
        },
        text: false
      })
      .removeClass('ui-corner-all')
      .addClass('custom-combobox-toggle ui-corner-right')
      .on('mousedown', function() {
        wasOpen = input.autocomplete('widget').is(':visible')
      })
      .on('click', function() {
        input.trigger('focus')
        if(wasOpen) return // Close if already visible
        input.autocomplete('search', '') // Pass empty string as value to search for, displaying all results
      })
    },

    _source: function( request, response ) {
      var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), 'i')
      response( this.element.children('option').map(function() {
        var text = $( this ).text()
        if ( this.value && ( !request.term || matcher.test(text) ) )
        return {
          label: text,
          value: text,
          option: this
        }
      }) )
    },
    _removeIfInvalid: function( event, ui ) {

      if(ui.item) return // Selected an item, nothing to do

      // Search for a match (case-insensitive)
      var value = this.input.val(),
      valueLowerCase = value.toLowerCase(),
      valid = false
      this.element.children('option').each(function() {
        if ( $( this ).text().toLowerCase() === valueLowerCase ) {
          this.selected = valid = true
          return false
        }
      })

      if(valid) return// Found a match, nothing to do

      // Remove invalid value
      this.input
      .val('')
      .attr('title', value + ' didn\'t match any item')
      .tooltip('open')
      this.element.val('')
      this._delay(function() {
        this.input.tooltip('close').attr('title', '')
      }, 2500 )
      this.input.autocomplete('instance').term = ""
    },
    _destroy: function() {
      this.wrapper.remove()
      this.element.show()
    }
  })
  $('select').combobox({
    select: function() { updateViewer(this.value)}
  })
}
function createSlider() {
  var initialSize = 500,
      maxWidth = 2000,
      docWidth = $(document).width()
  $('#size-slider').slider({
    min: 200,
    max: docWidth < maxWidth ? docWidth : maxWidth,
    step: 50,
    value: initialSize,
    slide: function(_, ui) {
      $('#size-label').html(ui.value)
    },
    change: updateViewer
  })
  $('#size-label').html($('#size-slider').slider('value'))
}
function init() {
  loadChilds(function() {
    loadData(function() {
      createComboBox()
      createSlider()
      updateViewer()
      $('#loading').hide()
      $('#ui').show()
    })
  })
}
