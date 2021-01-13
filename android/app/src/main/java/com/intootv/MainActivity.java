package com.intootv;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  // Swipe Card
  /*private ArrayList<String> al;
  private ArrayAdapter<String> arrayAdapter;
  private int i;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);


    al = new ArrayList<>();
    al.add("php");
    al.add("c");
    al.add("python");
    al.add("java");
    al.add("html");
    al.add("c++");
    al.add("css");
    al.add("javascript");

    arrayAdapter = new ArrayAdapter<>(this, R.layout.item, R.id.helloText, al );

    SwipeFlingAdapterView flingContainer = (SwipeFlingAdapterView) findViewById(R.id.frame);

    flingContainer.setAdapter(arrayAdapter);
    flingContainer.setFlingListener(new SwipeFlingAdapterView.onFlingListener() {
      @Override
      public void removeFirstObjectInAdapter() {
        // this is the simplest way to delete an object from the Adapter (/AdapterView)
        Log.d("LIST", "removed object!");
        al.remove(0);
        arrayAdapter.notifyDataSetChanged();
      }

      @Override
      public void onLeftCardExit(Object dataObject) {
        //Do something on the left!
        //You also have access to the original object.
        //If you want to use it just cast it (String) dataObject
        Toast.makeToast(MainActivity.this, "left", Toast.LENGTH_SHORT).show();
      }

      @Override
      public void onRightCardExit(Object dataObject) {
        Toast.makeToast(MainActivity.this, "right", Toast.LENGTH_SHORT).show();
      }

      @Override
      public void onAdapterAboutToEmpty(int itemsInAdapter) {
        // Ask for more data here
        al.add("XML ".concat(String.valueOf(i)));
        arrayAdapter.notifyDataSetChanged();
        Log.d("LIST", "notified");
        i++;
      }

      @Override
      public void onScroll(float scrollProgressPercent) {
        
      }
    });


    // Optionally add an OnItemClickListener
    flingContainer.setOnItemClickListener(new SwipeFlingAdapterView.OnItemClickListener() {
      @Override
      public void onItemClicked(int itemPosition, Object dataObject) {
        Toast.makeToast(MainActivity.this, "click", Toast.LENGTH_SHORT).show();
      }
    });

  }
*/

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "IntooTv";
  }
}
