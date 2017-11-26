javascript:
function(){
  var namelist_str="", mra_ff_count=0, mra_ff_list =[];
  
  function mra_favorite_count()
  {
    return $.find('.firend_favorite_block').length;
  }
  
  function mra_make_favorite_friend_list()
  {
    var ff_list_tmp = $.find('table');
    
    for(var i=0; i<mra_ff_count; i++)
    {
      mra_ff_list.push(ff_list_tmp[i].children[0].children[0].children[1].children[0].children[1].innerText.trim());
    }
  }
  
  mra_ff_count = mra_favorite_count();
  mra_make_favorite_friend_list();
  
  for(var i=0; i<mra_ff_count; i++)
  {
    namelist_str += (i+1) + ": ";
    namelist_str += mra_ff_list[i] + "\n";
  }
  
  alert(namelist_str);

}(); void(0);
